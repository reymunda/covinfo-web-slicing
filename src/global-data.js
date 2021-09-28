class GlobalData extends HTMLElement {
  connectedCallback() {
    this.confirmed = this.getAttribute('confirmed') || '0';
    this.deaths = this.getAttribute('deaths') || '0';
    this.recovered = this.getAttribute('recovered') || '0';
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="container">
        <div class="row global-case-data">
            <div class="col-md-4">
              <h2 class="global-confirmed" style="color: #FF6C6C;">${this.confirmed}</h2>
              <p>Confirmed</p>
            </div>
            <div class="col-md-4">
              <h2 class="global-deaths" style="color: #1D244E;">${this.deaths}</h2>
              <p>Deaths</p>
            </div>
            <div class="col-md-4">
              <h2 class="global-recovered" style="color: #7EE194;">${this.recovered}</h2>
              <p>Recovered</p>
            </div>
        </div>
      </div>
        `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['confirmed', 'deaths', 'recovered'];
  }
}

customElements.define('global-data', GlobalData);
