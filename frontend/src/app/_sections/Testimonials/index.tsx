import { TESTIMONIALS } from "./data";
import { cn, getRandomPastelColor } from "@/utils";

type ReviewCardProps = {
  author: string;
  review: string;
  date: string;
};

const ReviewCard = ({ author, review, date }: ReviewCardProps) => {
  const backgroundColor = getRandomPastelColor();

  return (
    <div
      style={{ backgroundColor }}
      className={
        "card opacity-1 px-4 py-2 h-fit w-3/5 min-w-[300px] max-w-[30%] hover:scale-110 hover:z-10 hover:shadow-md transition-all duration-300"
      }
    >
      {/* <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 140,
            }}
          />
        </Inset> */}
      <a href="#">
        <p className="text-2xl">{author}</p>
        <p>{review}</p>
        <p className="text-right">{date}</p>
      </a>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="flex flex-col gap-4 h-screen justify-center items-center w-fit">
      <h2 className="text-4xl font-bold">ΚΡΙΤΙΚΕΣ ΠΕΛΑΤΩΝ</h2>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 max-h-[80vh] overflow-scroll">
        {TESTIMONIALS.map((testimonial) => (
          <ReviewCard
            key={testimonial.author}
            author={testimonial.author}
            review={testimonial.review}
            date={testimonial.date}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
