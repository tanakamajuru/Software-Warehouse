import React from 'react';

// Icon Components
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function TestimonialSection() {
  const testimonials = [
    {
      name: 'Tendai Wenyika',
      location: 'From Harare',
      title: 'Excellent Business Software',
      content: 'Zimbabwe SOFTWARE & HARDWARE SOLUTIONS transformed our accounting department. The ZIMRA-compliant software saved us hours of work and eliminated errors. Their local support team is always available when we need help.',
      avatar: 'https://c.pxhere.com/images/3f/e4/9a1a903a1089c8ba2f8799663387-1451425.jpg!d'
    },
    {
      name: 'Chipo Musarurwa',
      location: 'From Bulawayo',
      title: 'Reliable CRM System',
      content: 'We implemented their CRM system across all our branches in Bulawayo and Harare. The software is intuitive and our staff adapted quickly. Best investment for our growing business.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-4.png'
    },
    {
      name: 'Henry Ford ',
      location: 'From Mutare',
      title: 'Outstanding Educational Tools',
      content: 'Their educational software aligned with Zimbabwe curriculum has improved student performance at our school. Teachers find it easy to use and parents appreciate the detailed progress reports.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-3.png'
    }
  ];

  return (
    <div className="testimonial-section container responsive-section">
      <div className="section-header text-center">
        <h2 className="section-title text-responsive-2xl">What our customers say</h2>
        {/* <p className="section-subtitle text-responsive-base">Trusted by Zimbabwean businesses nationwide</p> */}
      </div>

      <div className="testimonial-grid grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card responsive-card">
            <div className="testimonial-header">
              <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar responsive-image" />
              <div className="testimonial-info">
                <h3 className="testimonial-name text-responsive-lg">{testimonial.name}</h3>
                <p className="testimonial-location text-responsive-base">{testimonial.location}</p>
              </div>
            </div>

            <h4 className="testimonial-title text-responsive-base">{testimonial.title}</h4>

            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            <p className="testimonial-content text-responsive-base">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection;
