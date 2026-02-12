import { Star } from 'lucide-react';

function TestimonialSection() {
  const testimonials = [
    {
      name: 'Jennifer',
      location: 'From California',
      title: 'Great Price & Services',
      content: 'I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work on time, and if it is very busy they will rent a car.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-2.png'
    },
    {
      name: 'Jessica',
      location: 'From Chicago',
      title: 'Great Price & Services',
      content: 'I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work on time, and if it is very busy they will rent a car.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-4.png'
    },
    {
      name: 'Daniel',
      location: 'From Seattle',
      title: 'Great Price & Services',
      content: 'I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work on time, and if it is very busy they will rent a car.',
      avatar: 'https://ecommax.risingbamboo.com/wp-content/uploads/2022/10/persion-3.png'
    }
  ];

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What our customers say</h2>
          <p className="section-subtitle">Our references are very valuable the result of a great effort</p>
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
                  <Star key={i} size={16} className="star-filled" fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-content">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
