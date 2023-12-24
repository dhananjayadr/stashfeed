(function () {
  'use strict';

  const coreRail = document.getElementById('main');

  function addCss(css) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function hideElement(cssSelector) {
    addCss(`${cssSelector} {display:none;visibility:hidden;}`);
  }

  function handleContentMutation() {
    if (!window.location.pathname.startsWith("/feed")) {
      return;
    }

    const placeholderHTML = `
      <div style="padding:30px;">
        <h3>Don't "work harder." Instead:</h3>
        <br>
        <ul>
          <li>Cut away distractions. Use social media intentionally.</li>
          <li>Stop doing fake work and being busy, focus on the results.</li>
          <li>Ask for help & engage your mentors.</li>
          <li>Solicit criticism.</li>
          <li>Automate what can be automated in tools and processes.</li>
          <li>Exercise & Get more sleep. Take care of yourself!</li>
        </ul>
        <br>
        <h4>Whatever you do, don't "work harder." It's pretty much never the answer. Work smarter!<h4>
      </div>`;

    coreRail.lastElementChild.innerHTML = placeholderHTML;
  }

  const cssSelectors = [
    'div[data-id^="urn:li:activity:"]',
    '#feed-nav-item .nav-item__badge--doughnut',
    'div.feed-shared-update-v2',
    '.ad-banner-container',
    '.feed-shared-navigation-module, .feed-shared-navigation-module--v2',
    '.feed-follows-module',
    '.sort-dropdown__dropdown-trigger',
    '.feed-shared-news-module'
  ];

  cssSelectors.forEach(hideElement);
  handleContentMutation();

  const contentObserver = new MutationObserver(function (mutations) {
    mutations.forEach(handleContentMutation);
  });

  contentObserver.observe(coreRail, { childList: true });
})();
