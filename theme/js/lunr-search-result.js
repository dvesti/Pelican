function lunr_search(term) {
  if (!tipuesearch) {
    console.error("Pelican Elegant: Tipue search plugin is required");
    return;
  }

  const items = tipuesearch["pages"];
  const documents = tipuesearch["pages"];
  let counter = 0;

  for (item in documents) {
    documents[item]["id"] = counter;
    counter = counter + 1;
  }

  // Делаем русский язык - https://github.com/MihaiValentin/lunr-languages //

var lunr = require('./lib/lunr.js');
  require('./lunr.stemmer.support.js')(lunr);
  require('./lunr.ru.js')(lunr); // or any other language you want
  require('./lunr.multi.js')(lunr);

  // importScripts('lunr.stemmer.support.js');
  // importScripts('lunr.ru.js');  

var idx = lunr(function() {
  // use the language (ru)
  this.pipeline.reset();
  this.pipeline.add(
       trimmer,
       lunr.stopWordFilter,
       lunr.stemmer,
       lunr.ru.stemmer
     );
   this.pipeline.remove(lunr.stopWordFilter);
   this.use(lunr.ru);
   this.use(lunr.multiLanguage('en', 'ru'));
   this.ref("id");
   this.field("title");
   this.field("url");
   this.field("text", { boost: 10 });
   this.field("tags");

   
    items.forEach(function(doc) {
      this.add(doc);
    }, this);
  });

  if (term && idx && documents) {
    const resultHeadingRoot = document.getElementById(
      "lunr-search-result-heading"
    );
    const resultIntro = `
    <h1>Search Results for <code>${term}</code></h1>
    `;

    resultHeadingRoot.insertAdjacentHTML("beforeend", resultIntro);

    const resultRoot = document.getElementById("lunr-search-result");
    //put results on the screen.
    var results = idx.search(term);
    if (results.length > 0) {
      //if results
      for (var i = 0; i < results.length; i++) {
        var ref = results[i]["ref"];
        var url = documents[ref]["url"];
        var title = documents[ref]["title"];
        var body = documents[ref]["text"].substring(0, 280) + "...";

        const resultItem = `
          <div class="lunr-search-result-item">
              <h4>
                  <a href=${url}>
                  ${title}
                  </a>
               </h4>
              </a>
              <p class="lunr-search-result-item-body">${body}
              </p>
          </div>
          `;

        resultRoot.insertAdjacentHTML("beforeend", resultItem);
      }
    } else {
      const resultFailure = `<p class="lunr-result-fail">No results found for <span class="lunr-search-term">${term}</span></p>`;

      resultRoot.insertAdjacentHTML("beforeend", resultFailure);
    }
  }
  return false;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
    }
  }
}

var searchTerm = getQueryVariable("q");
if (searchTerm) {
  lunr_search(searchTerm);
}
