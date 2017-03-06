const app = { star: 0, issue: 0, comment: 0, repo: 0 };

function setUpOctoTab() {
  app.news = document.querySelector('body #dashboard > .news');
  app.dashboard = document.querySelector('body #dashboard');

  if (app.news) {
    document.removeEventListener('DOMNodeInserted', setUpOctoTab);
    document.removeEventListener('DOMContentLoaded', setUpOctoTab);
    document.querySelector('.news').classList.add('content-hidden', 'old-news');
    
    app.preCur = app.cur = 'star-news';
    refactorTheNews();
    aggregateEvents();
    initObserver();
  }
}

function initObserver(option = { childList: true, subtree: true, }) {
  document.querySelector('.refined-ajax-pagination-btn').addEventListener('click', (ev) => {
    ev.preventDefault();
    if (document.querySelector('.old-news .ajax-pagination-btn')) {
      document.querySelector('.refined-ajax-pagination-form').classList.toggle('loading');
      document.querySelector('.old-news .ajax-pagination-btn').click();
    } else {
      document.querySelector('.refined-ajax-pagination-btn').innerHTML = 'No more...';
    }
  });

  const mo = new MutationObserver((r) => {
    aggregateEvents();
    document.querySelector('.refined-ajax-pagination-form').classList.remove('loading');
  });

  mo.observe(app.news, option);
}

function aggregateEvents() {
  document.querySelectorAll('.old-news .alert.issues_opened').forEach((node) => {
    node.classList.add('issues');
  });

  document.querySelectorAll('.old-news .alert.issues_closed').forEach((node) => {
    node.classList.add('issues');
  });

  document.querySelectorAll('.old-news .alert.push').forEach((node) => {
    node.classList.add('issues');
  });

  document.querySelectorAll('.old-news .alert.fork').forEach((node) => {
    node.classList.add('repos');
  });

  document.querySelectorAll('.old-news .alert.create').forEach((node) => {
    node.classList.add('repos');
  });

  document.querySelectorAll('.old-news .alert.public').forEach((node) => {
    node.classList.add('repos');
  });

  document.querySelectorAll('.old-news .alert.member_add').forEach((node) => {
    node.classList.add('repos');
  });

  document.querySelectorAll('.old-news .alert.watch_started').forEach((e) => {
    app.starNews.append(e);
    document.querySelector('.star-news .counter').innerHTML = ++app.star;
  });

  document.querySelectorAll('.old-news .alert.issues').forEach((e) => {
    app.issueNews.append(e);
    document.querySelector('.issue-news .counter').innerHTML = ++app.issue;
  });

  document.querySelectorAll('.old-news .alert.repos').forEach((e) => {
    app.repoNews.append(e);
    document.querySelector('.repo-news .counter').innerHTML = ++app.repo;
  });

  document.querySelectorAll('.old-news .alert.issues_comment').forEach((e) => {
    app.commentNews.append(e);
    document.querySelector('.comment-news .counter').innerHTML = ++app.comment;
  });

  const newsToRemove = document.querySelectorAll('.old-news .alert');

  newsToRemove.forEach((e) => {
    app.news.removeChild(e);
  });
}

function showSpecifiedTab(evt) {
  let tab = evt.target.classList[0];
  app.preCur = app.cur;

  if (tab === 'star-tab') {
    app.cur = 'star-news';
  } else if (tab === 'repo-tab') {
    app.cur = 'repo-news';
  } else if (tab === 'issue-tab') {
    app.cur = 'issue-news';
  } else if (tab === 'comment-tab') {
    app.cur = 'comment-news';
  } else {
    return;
  }

  document.querySelector(`.underline-nav-item.selected`).classList.remove('selected');
  document.querySelector(`.${tab}`).classList.add('selected');
  document.querySelector(`.${app.preCur}`).classList.toggle('content-hidden');
  document.querySelector(`.${app.cur}`).classList.toggle('content-hidden');
}

function refactorTheNews() {
  const accountSwitcher = document.querySelector('.account-switcher');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');

  app.refinedNews = document.createElement('div');
  app.refinedNews.classList.add('refined-news', 'column', 'two-thirds', 'news');
  app.refinedNews.innerHTML = `
    <nav class="underline-nav" data-pjax="" role="navigation">
        <a href="#" class="star-tab underline-nav-item selected" aria-selected="false" role="tab">
          <svg aria-label="Watch" class="octicon octicon-star dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
          Star
        </a>
        <a href="#" class="issue-tab underline-nav-item " aria-selected="false" role="tab">
          <svg aria-label="Pull request" class="octicon octicon-git-pull-request dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="24"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
          Issues and
          Pull Requests
        </a>
        <a href="#" class="comment-tab underline-nav-item " aria-selected="false" role="tab">
        <svg aria-label="Issue comment" class="octicon octicon-comment-discussion dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M15 1H6c-.55 0-1 .45-1 1v2H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h1v3l3-3h4c.55 0 1-.45 1-1V9h1l3 3V9h1c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM9 11H4.5L3 12.5V11H1V5h4v3c0 .55.45 1 1 1h3v2zm6-3h-2v1.5L11.5 8H6V2h9v6z"></path></svg>          Comments
        </a>
        <a href="#" class="repo-tab underline-nav-item " aria-selected="false" role="tab">
          <svg aria-label="Create" class="octicon octicon-repo dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
          Repositories
        </a>
    </nav>
    <div class="star-news">
      <div class="alert simple">
        <div class="body">
          <div class="simple">
            There are <span class="counter"> 0 </span> star(s) here
          </div>
        </div>
      </div>
    </div>
    <div class="issue-news content-hidden">
    <div class="alert simple">
      <div class="body">
        <div class="simple">
            There are <span class="counter"> 0 </span> issues or pull requests here
        </div>
      </div>
    </div>
    </div>
    <div class="repo-news content-hidden">
      <div class="alert simple">
        <div class="body">
          <div class="simple">
            There are <span class="counter"> 0 </span> notification(s) about repositories here
          </div>
        </div>
      </div>
    </div>
    <div class="comment-news content-hidden">
      <div class="alert simple">
        <div class="body">
          <div class="simple">
            There are <span class="counter"> 0 </span> comment(s) here
          </div>
        </div>
      </div>
    </div>
    <form class="ajax-pagination-form js-ajax-pagination refined-ajax-pagination-form">
        <div style="margin:0;padding:0;display:inline">
        </div>
        <button type="submit" class="ajax-pagination-btn refined-ajax-pagination-btn">
          More
        </button>
    </form>
    <div class="text-center">
        <div class="mt-4">
          <svg aria-hidden="true" class="octicon octicon-light-bulb text-gray" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"></path></svg>
          <strong>ProTip!</strong>
          Edit your feed by updating the users you <a href="${document.querySelector('.text-center .mt-4 > a').href}">follow</a> and repositories you <a href="/watching">watch</a>.
        </div>

        <a class="link-gray-dark mt-3 d-inline-block" href="${document.querySelector('.text-center > a').href}" data-ga-click="Dashboard, click, News feed atom/RSS link - context:user"><svg aria-hidden="true" class="octicon octicon-rss mr-1" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M2 13H0v-2c1.11 0 2 .89 2 2zM0 3v1a9 9 0 0 1 9 9h1C10 7.48 5.52 3 0 3zm0 4v1c2.75 0 5 2.25 5 5h1c0-3.31-2.69-6-6-6z"></path></svg>Subscribe to <strong>your</strong> news feed</a>
    </div>
    `;

  accountSwitcher.classList.add('refined-account-swither');
  dashboardSidebar.insertBefore(accountSwitcher, dashboardSidebar.firstChild);
  app.dashboard.insertBefore(app.refinedNews, app.dashboard.firstChild);

  app.starNews = document.querySelector('.star-news');
  app.issueNews = document.querySelector('.issue-news');
  app.repoNews = document.querySelector('.repo-news');
  app.commentNews = document.querySelector('.comment-news');

  document.querySelector('.star-tab').addEventListener('click', showSpecifiedTab);
  document.querySelector('.issue-tab').addEventListener('click', showSpecifiedTab);
  document.querySelector('.comment-tab').addEventListener('click', showSpecifiedTab);
  document.querySelector('.repo-tab').addEventListener('click', showSpecifiedTab);
}

document.addEventListener('DOMNodeInserted', setUpOctoTab);
document.addEventListener('DOMContentLoaded', setUpOctoTab);
