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
      name: 'Jennifer',
      location: 'From California',
      title: 'Great Price & Services',
      content: 'I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish work on time, and if it is very busy they will rent a car.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-2.png'
    },
    {
      name: 'Jessica',
      location: 'From Chicago',
      title: 'Great Price & Services',
      content: 'I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish work on time, and if it is very busy they will rent a car.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-4.png'
    },
    {
      name: 'Daniel',
      location: 'From Seattle',
      title: 'Great Price & Services',
      content: 'I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish work on time, and if it is very busy they will rent a car.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-3.png'
    }
  ];

  return (
    <div className="testimonial-section">
      <div className="section-header">
        <h2 className="section-title">What our customers say</h2>
        <p className="section-subtitle">Our references are very valuable result of a great effort</p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
              <div className="testimonial-info">
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-location">{testimonial.location}</p>
              </div>
            </div>

            <h4 className="testimonial-title">{testimonial.title}</h4>

            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            <p className="testimonial-content">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection;
