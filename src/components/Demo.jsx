import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('articles');
    if (data) {
      setAllArticles(JSON.parse(data));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [...allArticles, newArticle];
      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
  };

  const handleCopied = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className=" relative flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Paste your article link here..."
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link${index}`}
              onClick={() => {
                setArticle(item);
              }}
              className="link_card"
            >
              <div
                className="copy_btn"
                onClick={() => {
                  handleCopied(item.url);
                }}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-sm font-medium truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 m-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loading"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">Well, that wasn't supposed to happens...</p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold font-satoshi text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
