import { fetchFromSanity } from "@/utils";

type ReviewCardProps = {
  author: string;
  review: string;
  date: string;
};

const ReviewCard = ({ author, review, date }: ReviewCardProps) => {
  // const backgroundColor = getRandomPastelColor();

  return (
    <div
      // style={{ backgroundColor }}
      className={
        "card bg-base-300 opacity-1 px-4 py-2 h-fit w-3/5 min-w-[300px] max-w-[30%] hover:scale-110 hover:z-10 hover:shadow-md transition-all duration-300"
      }
    >
      <a href="#">
        <p className="text-2xl">{author}</p>
        <p>{review}</p>
        <p className="text-right">{date}</p>
      </a>
    </div>
  );
};

const Testimonials = async () => {
  const testimonials = await fetchFromSanity("testimonial");

  return (
    <section className="flex flex-col gap-4 h-screen justify-center items-center w-fit">
      <h2 className="text-4xl font-bold">Testimonials</h2>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 max-h-[80vh] overflow-scroll">
        {testimonials.map((testimonial) => (
          <ReviewCard
            key={testimonial.author}
            author={testimonial.author}
            review={testimonial.text}
            date={testimonial.date}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
