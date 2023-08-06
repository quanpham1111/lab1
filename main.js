/**
 * Các kiến thức sử dụng trong file này
 * các bạn sẽ được học trong khóa JavaScript Pro
 * sẽ được ra mắt trong đầu năm 2023.
 */
import { LitElement, html, css } from 'lit';

const styles = css`
    :host {
        font-family: 'Montserrat', sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    .wrapper,
    .overlay {
        position: fixed;
        inset: 0;
    }

    .wrapper {
        display: flex;
        z-index: 100;
    }

    .overlay {
        background-color: rgba(0, 0, 0, 0.6);
        animation: fade-in 0.3s;
    }

    header h1 {
        font-size: 24px;
        font-weight: 700;
    }

    .container {
        position: relative;
        z-index: 1;
        min-width: 320px;
        max-width: 80%;
        margin: auto;
        padding: 0 20px 20px;
        border-radius: 4px;
        background-color: #fff;
        animation: fade-in 0.3s, grow-up 0.3s;
    }

    .wrapper.closing {
        pointer-events: none;
    }

    .wrapper.closing .overlay {
        animation: fade-out 0.3s forwards;
    }

    .wrapper.closing .container {
        animation: fade-out 0.3s forwards, grow-down 0.3s forwards;
    }

    .content {
        font-size: 16px;
        line-height: 1.6;
    }

    footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 32px;
    }

    button {
        border: none;
        padding: 6px 16px;
        border-radius: 4px;
        color: #fff;
        background: linear-gradient(141.34deg, #5ebbff 0%, #a174ff 91.11%)
            border-box;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes grow-up {
        from {
            transform: scale(0.5);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes grow-down {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(0);
        }
    }
`;

class AppModal extends LitElement {
    constructor() {
        super();

        this._show = false;
        this._closing = false;
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            heading: { type: String },
            label: { type: String },
        };
    }

    get _modal() {
        return this.renderRoot.querySelector('#modal');
    }

    _toggle = () => {
        if (!this._show) {
            this._show = true;
            this.requestUpdate();
        } else {
            this._modal.classList.add('closing');
            this._modal.querySelector('.container').addEventListener(
                'animationend',
                () => {
                    this._show = false;
                    this.requestUpdate();
                },
                { once: true },
            );
        }
    };

    render() {
        return html`
            ${this._show
                ? html`
                      <div id="modal" class="wrapper">
                          <div class="overlay" @click="${this._toggle}"></div>
                          <div class="container">
                              <header>
                                  <h1>${this.heading}</h1>
                              </header>
                              <div class="content">
                                  <slot></slot>
                              </div>
                              <footer>
                                  <button @click="${this._toggle}">
                                      Đóng lại
                                  </button>
                              </footer>
                          </div>
                      </div>
                  `
                : ''}
            <button @click="${this._toggle}">${this.label}</button>
        `;
    }
}

if (!customElements.get('app-modal')) {
    customElements.define('app-modal', AppModal);
}
