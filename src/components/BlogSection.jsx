function BlogSection() {
  const blogs = [
    {
      category: 'SOFTWARE',
      date: '15TH FEB 2025',
      title: 'Zimbabwe Businesses Embrace Digital Accounting Solutions',
      excerpt: 'Local companies are increasingly adopting ZIMRA-compliant accounting software to streamline operations and improve tax compliance. This digital transformation is helping businesses save time and reduce errors in financial reporting.',
      image: 'https://www.internationalaccountingbulletin.com/wp-content/uploads/sites/9/2023/04/shutterstock_2072821730-1.jpg'
    },
    {
      category: 'HARDWARE',
      date: '12TH FEB 2025',
      title: 'New Computer Hardware Arrives in Harare',
      excerpt: 'Major distributors have announced the arrival of the latest generation of business computers and laptops specifically configured for Zimbabwean business needs. These systems come with local support and warranty services.',
      image: 'https://microless.com/cdn/products/f03dc54d82d62a8ace464566005d45d5-md.jpg'
    },
    {
      category: 'SOFTWARE',
      date: '8TH FEB 2025',
      title: 'School Management Software Gains Traction',
      excerpt: 'Educational institutions across Zimbabwe are implementing comprehensive school management systems to handle student records, fees, and online learning platforms. The shift comes after successful pilot programs in major provinces.',
      image: 'https://www.codekingsolutions.com/frontend/images/cloud-services/school-management-system.png'
    },
    {
      category: 'HARDWARE',
      date: '5TH FEB 2025',
      title: 'Point of Sale Systems Revolutionize Retail',
      excerpt: 'Modern POS systems with inventory management are transforming retail operations in Zimbabwean shops and supermarkets. These solutions offer real-time sales tracking and automated stock management.',
      image: 'https://arirms.com/wp-content/uploads/2020/04/What-is-POS-1.jpg'
    },
    {
      category: 'SOFTWARE',
      date: '1ST FEB 2025',
      title: 'Government Digital Initiative Boosts Software Adoption',
      excerpt: 'The Zimbabwean government\'s digitalization campaign is encouraging businesses to adopt modern software solutions. This initiative includes tax incentives for companies implementing digital systems.',
      image: 'https://media.licdn.com/dms/image/v2/D4E12AQEZxHt0nQ5qcg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1729087133853?e=2147483647&v=beta&t=pFBSnMjjpbxg7xbscw6bsov8VzE8bXvOqhI8sXubiEk'
    },
    {
      category: 'HARDWARE',
      date: '28TH JAN 2025',
      title: 'Local Assembly of Computer Components Begins',
      excerpt: 'Zimbabwean tech companies have started local assembly of computer components, reducing costs and improving availability of hardware for businesses and consumers.',
      image: 'https://www.lifewire.com/thmb/pN3pANbQyulPhNX8G9utySe2rhY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-2148596892-631b5ebf62744a02be6fefe1254a50de.jpg'
    }
  ];

  return (
    <div className="blog-section container">
      <div className="section-header text-center">
        <h2 className="section-title text-responsive-2xl">FROM LATEST NEWS</h2>
      </div>
      <div className="blog-grid grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <div className="blog-meta">
                <span>{blog.category}</span>
                <span>BY ADMIN</span>
                <span>{blog.date}</span>
              </div>
              <div className="blog-title text-responsive-lg">{blog.title}</div>
              <div className="blog-excerpt text-responsive-base">{blog.excerpt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;
