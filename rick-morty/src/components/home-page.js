import { LitElement, html, css } from "lit";
import "./rick-morty.js";

const logoNombre = new URL("../../assets/nombreRick-morty.png", import.meta.url)
  .href;
const logoPortal = new URL("../../assets/logoPortal.png", import.meta.url).href;

class HomePage extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20vh;
    }
    .logoNombre {
      width: 28rem;
      padding: 2rem;
      margin-top: 2rem;
    }

    .container-main {
      display: flex;
      width: 100%;
      align-items: center;
    }

    aside,
    main {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 1rem;
    }
    .logoPortal {
      width: 30rem;
    }
    p {
      font-size: 1rem;
      text-align: center;
      margin: 0 5rem;
      color: white;
    }
    section {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    button {
      background-color: #7bfd4f;
      border: none;
      border-radius: 2rem;
      padding: 1rem 2.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #EBE480;
    }
  `;
  _navigate(e) {
    e.preventDefault();
    window.history.pushState({}, "", "/characters");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    return html`
      <div class="container">
        <header>
          <img
            class="logoNombre"
            src="${logoNombre}"
            alt="Rick and Morty Portal"
          />
        </header>
        <div class="container-main">
          <aside class="img-portal">
            <img
              class="logoPortal"
              src="${logoPortal}"
              alt="Rick and Morty Portal"
            />
          </aside>
          <main>
            <div>
              <p>
                <b> ¡Bienvenido al Portal de Rick y Morty!<br /></b>
                Aquí comienza tu aventura interdimensional a través del universo
                caótico, hilarante y a veces perturbador de Rick y Morty. Desde
                los personajes más icónicos hasta los episodios más memorables,
                este portal te llevará a través de galaxias lejanas, realidades
                paralelas y dimensiones que desafían toda lógica. Explora cada
                rincón del multiverso: conoce a los cientos de versiones de
                Rick, descubre a Mortys alternativos, revive los mejores
                momentos de la serie y accede a información detallada sobre cada
                episodio, planeta y criatura.
              </p>
              <section>
                <button @click="${this._navigate}">Personajes</button>
              </section>
            </div>
          </main>
        </div>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);
