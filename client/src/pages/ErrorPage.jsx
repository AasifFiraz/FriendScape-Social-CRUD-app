import "./ErrorPage.css"

export default function ErrorPage() {

  return (
    <div className="not-found-page">
      <div className="not-found-page-inner">
        <h1>Sorry, the page you were looking for could not be found!</h1>
        <p>The link you followed may be broken, or the page may have been removed.</p>
      </div>
    </div>
  );
}
