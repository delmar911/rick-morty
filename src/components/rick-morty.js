import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import "./GetData.js";

const fondo = new URL("../assets/fondopantalla.jpg", import.meta.url).href;

class RickMorty extends LitElement {
  static properties = {
    wiki: { type: Array },
    selectedCharacter: { type: Object },
    params: { type: Object },
  };

  static styles = css`
    header {
      display: flex;
      justify-content: center;
    }
    .back {
      margin: 10px;
    }
    .container {
      display: flex;
      justify-content: center;
    }
    h1 {
      color: white;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .card {
      background-color: #a6cccc;
      border-radius: 30px;
      margin: 10px;
      padding: 20px;
      width: 250px;
      text-align: center;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .card-content img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    .card-content h2 {
      font-size: 1.2em;
      margin: 0.5em 0;
    }

    .card-content p {
      margin: 0;
      font-size: 0.9em;
    }

    .hidden {
      display: none;
    }

    .detail {
      width: 30%;
      background: #a6cccc;
      padding: 20px 10px 30px 10px;
      margin: 10px 10px 30px 10px;
      border-radius: 25px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.5s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .detail img {
      width: 220px;
      height: 220px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .detail h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .detail p {
      font-size: 1rem;
      margin: 0.3rem 0;
      color: #555;
      width: 100%;
      text-align: left;
      max-width: 300px;
    }

    .detail p strong {
      color: #111;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    button {
      background-color: #7bfd4f;
      border: none;
      border-radius: 2rem;
      padding: 1rem 2.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 20px;
    }

    button:hover {
      background-color: #ebe480;
    }
  `;

  constructor() {
    super();
    this.wiki = [];
    this.params = {};
    this.selectedCharacter = null;
    this.addEventListener("send-data", (e) => this._dataFormat(e.detail.data));
  }

  async onBeforeEnter(location) {
    const id = location.params.id;
    this.params = location.params;
    if (id) {
      await this._fetchCharacterById(id);
    }
  }

  _dataFormat(data) {
    this.wiki = data.results.map((c) => ({
      id: c.id,
      name: c.name,
      species: c.species,
      status: c.status,
      image: c.image,
    }));
  }

  async _fetchCharacterById(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    this.selectedCharacter = await res.json();
  }

  _goToDetail(id) {
    Router.go(`/characters/${id}`);
  }

  render() {
    return html`
      <div
        style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.725),
        rgba(0, 0, 0, 0.725)
      ),
      url(${fondo});
    background-size: cover;
    background-position: center;
    z-index: -1;
  "
      ></div>
      <get-data
        url="https://rickandmortyapi.com/api/character"
        method="GET"
      ></get-data>
      <header>
        <h1>Personajes</h1>
      </header>
      <button class="back" @click=${() => Router.go("/")}>< Inicio</button>
      <div class="container">
        <div class="list">
          ${!this.selectedCharacter
            ? this.wiki.map(
                (character) => html`
                  <div
                    class="card"
                    @click=${() => this._goToDetail(character.id)}
                  >
                    <div class="card-content">
                      <img src="${character.image}" alt="${character.name}" />
                      <h2>${character.name}</h2>
                      <p>Species: ${character.species} | ${character.status}</p>
                    </div>
                  </div>
                `
              )
            : ""}
        </div>

        ${this.selectedCharacter
          ? html`
              <div class="detail">
                <img
                  src="${this.selectedCharacter.image}"
                  alt="${this.selectedCharacter.name}"
                />
                <h2>${this.selectedCharacter.name}</h2>
                <p>
                  <strong>Species:</strong> ${this.selectedCharacter.species}
                </p>
                <p><strong>Status:</strong> ${this.selectedCharacter.status}</p>
                <p><strong>Gender:</strong> ${this.selectedCharacter.gender}</p>
                <p>
                  <strong>Origin:</strong> ${this.selectedCharacter.origin.name}
                </p>
                <button @click=${() => Router.go("/characters")}>Volver</button>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("rick-morty", RickMorty);
