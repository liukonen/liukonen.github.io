import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

interface BlogItem {
  title: string;
  link: string;
  published: string;
}

interface DisplayItem {
  title: string;
  link: string;
  timestamp: string;
  index: number;
}

const Blogs: FunctionalComponent = () => {
  const [items, setItems] = useState<DisplayItem[] | null>(null);

  const getItems = (blogItems: BlogItem[]): DisplayItem[] =>
    blogItems.slice(0, 3).map((item, i) => ({
      title: item.title,
      link: item.link,
      timestamp: item.published,
      index: i
    }));

  useEffect(() => {
    const cache = sessionStorage.getItem("dev.liukonen.blogstore");
    if (cache) {
      setItems(JSON.parse(cache));
      console.log("blog items pulled from cache");
    } else {
      fetch("./json/feeds.json")
        .then(res => res.json())
        .then(data => {
          const fetchedItems = getItems(data.items);
          setItems(fetchedItems);
          sessionStorage.setItem(
            "dev.liukonen.blogstore",
            JSON.stringify(fetchedItems)
          );
          console.log(fetchedItems);
        })
        .catch(err => console.error("Error loading JSON:", err));
    }
  }, []);

  return (
    <div id="Blogs" className="container">
      <h3 className="text-center h3 mt-5 tshadow">Recent Articles / Blogs</h3>

      {items?.map(article => (
        <figure key={article.id}>
          <blockquote class="blockquote">
            <p>
              <a
                href={`${encodeURIComponent(article.link)}`} 
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
            </p>
          </blockquote>
          <figcaption class="blockquote-footer">
            {article.timestamp && article.timestamp.slice(0, -9)} 
          </figcaption>
        </figure>
      ))}


      {/* Optional: Inline style can be moved to CSS */}
      <style>
        {`
          .white-overlay {
            position: relative;
          }
          .white-overlay::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default Blogs;
