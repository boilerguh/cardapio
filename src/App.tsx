import { useState, useMemo } from 'react'
import './App.css'
import { products } from './data/products'
import { useCart } from './contexts/CartContext'

// Icons Components
const IconHome = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
const IconMenu = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
const IconAbout = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
const IconContact = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>

interface MenuItemProps {
  product: any;
  onAdd: (p: any) => void;
}

const MenuItem = ({ product, onAdd }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu-item-row">
      <div className={`menu-item-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="item-left">
          <span className="item-name">{product.name}</span>
          {product.subtext && (
            <small className="item-desc" style={{ display: 'block', fontSize: '0.75rem', opacity: 0.5, marginTop: '2px', fontWeight: 400 }}>
              {product.subtext}
            </small>
          )}
        </div>
        <div className="item-right">
          <span className="item-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
          <button
            className="add-btn-circle"
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          >
            +
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="item-details" onClick={() => setIsOpen(false)}>
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <img src={`https://placehold.co/600x300/1a1a1a/orange?text=${product.name}`} alt="Foto indisponível" />
          )}
          <p>{product.description || "O sabor único que você já conhece, preparado com perfeição pela equipe BoilerGuh."}</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('signature')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')

  const { cart, addToCart, updateQuantity, totalPrice, totalItems } = useCart()

  const signatureProducts = useMemo(() => products.filter(p => p.featured || p.category === 'Signature'), [])
  const menuCategories = useMemo(() => [...new Set(products.map(p => p.category))], [])

  const handleSendOrder = () => {
    if (!customerName) {
      alert('Por favor, digite seu nome para o pedido.')
      return
    }
    const itemsText = cart.map(item => `• ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`).join('\n')
    const message = `🧾 *PEDIDO - BOILER GUH*\n---------------------------\n*Cliente:* ${customerName}\n*Mesa/Local:* ${tableNumber || 'Não informada'}\n---------------------------\n*ITENS:*\n${itemsText}\n---------------------------\n*TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n---------------------------\n🍹 _Gerado pela WebApp BoilerGuh_`
    window.open(`https://wa.me/5511996416164?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="container">
      <header>
        <img src="/Boilerguh-logo-white.webp" alt="Boiler Guh" className="logo-circle" />
        <p className="tagline">SUNSET AFTER PARTY</p>
      </header>

      {/* --- PAGE: DESTAQUES (SIGNATURE) --- */}
      {activeTab === 'signature' && (
        <section className="page active">
          <h2>Signature Drinks</h2>
          <div className="featured-list">
            {signatureProducts.map(product => (
              <div key={product.id} className="drink-card">
                <div className="drink-image-box">
                  <img src={product.image} alt={product.name} />
                  <span className="price-tag" style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--accent)', color: '#000', padding: '5px 12px', borderRadius: '10px', fontWeight: 800 }}>
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                <div className="drink-card-content">
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>{product.name}</strong>
                    <small style={{ opacity: 0.6, fontSize: '0.8rem' }}>{product.subtext || product.description}</small>
                  </div>
                  <button
                    className="add-btn-circle"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Favoritos</h2>
          <div className="menu-group">
            {products.filter(p => p.category === 'Combos').slice(0, 3).map(product => (
              <MenuItem key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        </section>
      )}

      {/* --- PAGE: FULL MENU --- */}
      {activeTab === 'full-menu' && (
        <section className="page active">
          <div className="search-bar" style={{ marginBottom: '25px' }}>
            <input
              type="text"
              placeholder="Buscar no cardápio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '16px', borderRadius: '15px', border: '1px solid var(--border)', background: 'var(--glass)', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {menuCategories.map(category => (
            <div key={category}>
              <h2>{category}</h2>
              <div className="menu-group">
                {products.filter(p => p.category === category)
                  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(product => (
                    <MenuItem key={product.id} product={product} onAdd={addToCart} />
                  ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* --- PAGE: ABOUT --- */}
      {activeTab === 'about' && (
        <section className="page active">
          <h2>A Vibe Sunset</h2>
          <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000&auto=format&fit=crop" alt="Vibe" className="about-hero" />

          <div className="about-text" style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '20px', padding: '25px', marginBottom: '20px' }}>
            <p style={{ margin: '0 0 15px 0', lineHeight: '1.6', fontSize: '0.9rem' }}>O <strong>BOILERGUH</strong> é uma sunset organizada pelo <strong>DJ Gugu</strong>, especialmente voltada aos apreciadores de música eletrônica, bons drinks e bons momentos entre amigos.</p>
            <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.9rem' }}>A proposta do evento é oferecer uma experiência única, proporcionando aos DJs e futuros DJs a oportunidade de conhecer e utilizar equipamentos de última geração. Sem line-up fixo, o BOILERGUH abre espaço para novos talentos que desejam compartilhar seu som, garantindo tardes marcadas por muita energia, boas vibrações e conexões genuínas.</p>
          </div>

          <div className="about-text" style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '20px', padding: '25px', marginBottom: '40px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Recados Importantes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.85rem' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <strong>Entrada:</strong> R$ 20,00 <span style={{ opacity: 0.9 }}>(PIX: 38697902886 - Maria Julia)</span>
              </div>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <strong>Bar no Local:</strong> Temos bar completo para sua comodidade.
              </div>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <strong>Proibido:</strong> Entrada de Cooler 🚫
              </div>
              <div>
                <strong>Dúvidas:</strong> Fale com Gugu, Kadhim ou Thiago.
              </div>
            </div>
          </div>

          <div className="payment-box">
            <h3 style={{ textTransform: 'uppercase', marginBottom: '10px', fontSize: '0.9rem' }}>⚡ Pagamento Antecipado</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '15px' }}>Garanta sua entrada de forma rápida</p>
            <a href="https://link.mercadopago.com.br/boillerguh" target="_blank" rel="noreferrer" className="qr-container" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://link.mercadopago.com.br/boillerguh" alt="QR" style={{ width: 130, display: 'block' }} />
            </a>
            <br />
            <a href="https://link.mercadopago.com.br/boillerguh" target="_blank" className="contact-btn" style={{ background: 'var(--accent)', color: '#000', border: 'none', display: 'inline-flex', width: 'auto', padding: '10px 30px', marginTop: '15px' }}>Link de Pagamento</a>
          </div>

          <div className="warning-card" style={{ borderLeft: '4px solid var(--danger)', marginTop: '20px', background: 'rgba(255, 71, 87, 0.05)', padding: '20px', borderRadius: '15px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--danger)', fontWeight: 800 }}>⚠️ TOLERÂNCIA ZERO</span>
            <p style={{ fontSize: '0.85rem', marginTop: '10px', opacity: 0.9 }}>O Boiler Guh é um lugar de celebração. Aplicamos uma política absoluta de <strong>Zero Drogas</strong>.</p>
            <ul style={{ fontSize: '0.8rem', marginTop: '8px', paddingLeft: '20px', opacity: 0.8 }}>
              <li>Proibido Lança-perfume, Loló ou entorpecentes.</li>
              <li>O descumprimento acarretará na remoção imediata.</li>
            </ul>
          </div>

          <div style={{ background: 'var(--glass)', borderRadius: '15px', padding: '15px', marginTop: '20px', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>⚠️ Regras da Pista</span>
            <p style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.9 }}>Jamais apoie copos ou bebidas na mesa da CDJ. Proteja a música!</p>
          </div>

          <div className="faq-section" style={{ marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '30px', letterSpacing: '2px' }}>DÚVIDAS FREQUENTES</h3>

            {[
              { q: 'Qual o valor e como comprar?', a: 'A entrada custa <strong>R$ 20,00</strong>. O pagamento é feito via PIX na hora ou antecipado.<br><br><strong>Chave PIX:</strong> 38697902886 (Maria Julia)<br>Envie o comprovante para a produção na entrada.' },
              { q: 'Posso levar meu cooler?', a: '<strong>Não.</strong> A entrada de coolers com bebidas é proibida. Temos um bar completo no local com drinks, cervejas e combos para sua maior comodidade e segurança.' },
              { q: 'Qual o estilo de música?', a: 'A vibe é 100% <strong>Música Eletrônica</strong>. O Boiler Guh é focado em revelar novos talentos e DJs da cena, sem line-up fixo, garantindo sempre uma surpresa sonora de alta qualidade.' },
              { q: 'O que é proibido levar?', a: 'Para a segurança de todos, não é permitida a entrada de:<br><ul><li>Lança-perfume / Loló (Tolerância Zero);</li><li>Drogas ilícitas;</li><li>Objetos cortantes ou armas;</li><li>Bebidas de fora.</li></ul>' }
            ].map((item, idx) => (
              <details key={idx} style={{ background: 'var(--glass)', marginBottom: '15px', borderRadius: '20px', border: '1px solid var(--accent)', padding: '5px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', padding: '15px 20px', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item.q}</span>
                  <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>+</span>
                </summary>
                <div style={{ padding: '0 20px 20px 20px', fontSize: '0.85rem', opacity: 0.9, lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: item.a }} />
              </details>
            ))}
          </div>
        </section>
      )}

      {/* --- PAGE: CONTACT --- */}
      {activeTab === 'contact' && (
        <section className="page active">
          <h2>Contato & Localização</h2>
          <div className="contact-container">
            <a href="https://chat.whatsapp.com/FMmUgv5QYVR8UrrteGq6bn" target="_blank" className="contact-btn btn-whatsapp" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem' }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                ENTRE NO GRUPO DE COMUNICAÇÕES OFICIAIS DO BOILER GUH
              </div>
            </a>

            <p style={{ opacity: 0.5, fontSize: '0.65rem', margin: '35px 0 15px 0', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>DÚVIDAS / PRODUÇÃO:</p>
            <div className="maps-row">
              <a href="https://wa.me/5511996416164" target="_blank" className="contact-btn btn-whatsapp" style={{ flex: 1 }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                FALAR COM GUGU
              </a>
              <a href="https://wa.me/5519996010103" target="_blank" className="contact-btn btn-whatsapp" style={{ flex: 1 }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                FALAR COM THIAGO
              </a>
            </div>

            <p style={{ opacity: 0.5, fontSize: '0.65rem', margin: '30px 0 10px 0', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>COMO CHEGAR:</p>
            <div className="maps-row">
              <a href="https://www.google.com/maps/search/?api=1&query=Rua+Dois+842+Itaguacu" target="_blank" className="contact-btn btn-maps" style={{ flex: 1 }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>
                MAPS
              </a>
              <a href="https://waze.com/ul/h6gykzu132" target="_blank" className="contact-btn btn-maps" style={{ flex: 1 }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM6 8a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H6zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" /></svg>
                WAZE
              </a>
            </div>

            <div style={{ background: 'var(--glass)', padding: '25px', borderRadius: '20px', marginTop: '20px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', margin: 0 }}>📍 <strong>Boiler Guh</strong></p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '8px' }}>Rua dois, 842 - ITAGUAÇÚ</p>
            </div>

            <div className="thanks-box">
              <h3>Curtiu a vibe?</h3>
              <a href="https://maps.app.goo.gl/gmZa8fZMNWfAKpTAA" target="_blank" className="action-link">
                <div className="action-content">
                  <span>⭐</span>
                  <span>Avaliar no Google</span>
                </div>
                <span>→</span>
              </a>
              <a href="https://www.instagram.com/boiler_guh/" target="_blank" className="action-link">
                <div className="action-content">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.234-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /></svg>
                  <span>Visite nosso Instagram</span>
                </div>
                <span>→</span>
              </a>
              <a href="#" className="action-link" onClick={(e) => { e.preventDefault(); navigator.share ? navigator.share({ title: 'Boiler Guh', url: window.location.href }) : alert('Link copiado!'); }}>
                <div className="action-content">
                  <span>🚀</span>
                  <span>Compartilhe com amigos</span>
                </div>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* --- UI ELEMENTS: NAVIGATION (Icons) --- */}
      {totalItems > 0 && (
        <div className="cart-floating-trigger" onClick={() => setIsCartOpen(true)}>
          <span>🛒 {totalItems} Itens</span>
          <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
        </div>
      )}

      <nav className="nav-bar">
        <button className={`nav-btn ${activeTab === 'signature' ? 'active' : ''}`} onClick={() => setActiveTab('signature')}>
          <IconHome />
          <span>Início</span>
        </button>
        <button className={`nav-btn ${activeTab === 'full-menu' ? 'active' : ''}`} onClick={() => setActiveTab('full-menu')}>
          <IconMenu />
          <span>Menu</span>
        </button>
        <button className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
          <IconAbout />
          <span>Sobre</span>
        </button>
        <button className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
          <IconContact />
          <span>Local</span>
        </button>
      </nav>

      {/* --- CART DRAWER --- */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: 'var(--accent)', margin: 0, fontSize: '1.4rem' }}>🛒 Meu Pedido</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem' }}>✕</button>
            </div>

            <div className="cart-items-list" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} className="menu-item-toggle" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="item-left">
                    <span className="item-name">{item.name}</span>
                    <small style={{ display: 'block', opacity: 0.5 }}>R$ {item.price.toFixed(2)} un.</small>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '50px' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 800 }}>-</button>
                    <span style={{ fontWeight: 800 }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 800 }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-form" style={{ marginTop: '25px' }}>
              <input type="text" placeholder="Seu Nome" value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ width: '100%', marginBottom: '12px', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              <input type="text" placeholder="Mesa / Área" value={tableNumber} onChange={e => setTableNumber(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 900, marginBottom: '20px' }}>
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <button onClick={handleSendOrder} style={{ width: '100%', padding: '20px', borderRadius: '18px', border: 'none', background: 'var(--success)', color: '#fff', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)' }}>
                Confirmar e Enviar WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
      <footer style={{ textAlign: 'center', padding: '40px 0', opacity: 0.4, fontSize: '0.7rem' }}>
        <p style={{ letterSpacing: '2px', fontWeight: 700, margin: '0 0 10px 0' }}>BOILER GUH © 2026</p>
        <p style={{ margin: '0 0 20px 0' }}>Fotos por Johann Trasch e YesMore Content na Unsplash.</p>
        <a href="https://instagram.com/boilerguh" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </footer>
    </div>
  )
}

export default App
