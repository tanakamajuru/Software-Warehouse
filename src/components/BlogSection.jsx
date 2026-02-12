function BlogSection() {
  const blogs = [
    {
      category: 'AUDIO',
      date: '18TH APR 2024',
      title: 'Eleifend augue volutpat in tincidunt nisla interdum facilisis vivamus',
      excerpt: 'Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit ullamcorper turpis...'
    },
    {
      category: 'AUDIO',
      date: '18TH APR 2024',
      title: 'Sed ut mi at odio commodo rhoncus et id arcu facilisis...',
      excerpt: 'Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi...'
    },
    {
      category: 'AUDIO',
      date: '18TH APR 2024',
      title: 'Vestibulum lobortis mi a dui maximus, et eleifend augue...',
      excerpt: 'Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi...'
    }
  ];

  return (
    <div className="blog-section">
      <div className="section-header">
        <h2 className="section-title">FROM LATEST NEWS</h2>
      </div>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <div className="blog-image" />
            <div className="blog-content">
              <div className="blog-meta">
                <span>{blog.category}</span>
                <span>BY ADMIN</span>
                <span>{blog.date}</span>
              </div>
              <div className="blog-title">{blog.title}</div>
              <div className="blog-excerpt">{blog.excerpt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;
