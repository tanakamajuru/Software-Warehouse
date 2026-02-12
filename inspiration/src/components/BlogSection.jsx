import { Calendar, User } from 'lucide-react';

function BlogSection() {
  const posts = [
    {
      title: 'Eleifend augue volutpat in tincidunt nisla interdum facilisis vivamus',
      category: 'Audio',
      excerpt: 'Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit ullamcorper turpis...',
      image: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/blognew-1.jpg',
      author: 'admin',
      date: '18th Apr 2024'
    },
    {
      title: 'Sed ut mi at odio commodo rhoncus et id arcu facilisis pellentesque',
      category: 'Audio',
      excerpt: 'Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit ullamcorper turpis...',
      image: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/blognew-2-600x600.jpg',
      author: 'admin',
      date: '18th Apr 2024'
    },
    {
      title: 'Vestibulum lobortis mi a dui maximus, et eleifend augue volutpat',
      category: 'Audio',
      excerpt: 'Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit ullamcorper turpis...',
      image: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/blognew-3-600x600.jpg',
      author: 'admin',
      date: '18th Apr 2024'
    }
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">From latest news</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <div key={index} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">{post.category}</span>
              </div>

              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-meta">
                  <span className="blog-author">
                    <User size={14} />
                    By {post.author}
                  </span>
                  <span className="blog-date">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
