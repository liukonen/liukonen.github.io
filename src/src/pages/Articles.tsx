import { useState, useEffect } from 'preact/hooks';
import { fetchDevArticles, DevArticle } from '../services/devToService';

export default function Articles() {
  const [articles, setArticles] = useState<DevArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1000 is the max limit for a single page on the Dev.to API
    fetchDevArticles('liukonen', 30)
      .then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-layer articles-view">
      <div className="breadcrumb">
        <a href="#/">~/root</a> <span className="sep">/</span> ARTICLES
      </div>
      
      <header className="era-header">
        <h1 className="gold-text">Writeups, Guides, and Tutorials</h1>
        <p className="sub-header">Technical documentation and architectural insights from my dev.to <a href="https://dev.to/liukonen" target="_blank">profile</a></p>
      </header>

      {loading ? (
        <div className="terminal-loader">PULLING_REMOTE_DATA...</div>
      ) : (
        <div className="full-article-grid">
          {articles.map(article => (
            <div key={article.id} className="verbose-article-card">
              <div className="card-meta">
                {new Date(article.published_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: '2-digit', 
                  year: '2-digit' 
                })} • {article.reading_time_minutes} min read
              </div>
              <a href={article.url} target="_blank" style="text-decoration: none"><h3><span class="bi bi-box-arrow-up-right"></span> {article.title}</h3></a>

              <p>{article.description}</p>
              <div className="tag-cloud">
                {article.tag_list.map(tag => <span key={tag} className="tag">#{tag}</span>)}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}