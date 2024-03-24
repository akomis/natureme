import Image from 'next/image';

const About = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-4 h-screen justify-center items-center">
      <div className="w-[100vw] grid grid-cols-1 gap-2">
        <div className="image-container max-h-56">
          <Image
            className="image"
            src={'/about_1.webp'}
            fill
            alt="Κεραλοιφές NatureMe"
          />
        </div>
        <div className="image-container flex gap-2 max-h-40">
          <Image
            className="image"
            src={'/about_2.webp'}
            fill
            alt="Αρωματικά Χώρου NatureMe"
          />
          <Image
            className="image"
            src={'/about_3.webp'}
            fill
            alt="Σαπούνια NatureMe"
          />
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-bold">ΠΙΟΙ ΕΙΜΑΣΤΕ</h2>
        <div className="flex flex-col gap-4 text-xl">
          <p>
            {
              'Hello followers and beloved people. Let us introduce. Natureme is a creation of Pavlina, who back in 2016 started experimenting with natural ingredients creating cosmetics and cleansing products for her in order to show respect to earth(our home) and to her body(her temple) by not harming them.  Her main ingredients for that is olive oil that her dad produce every year at their village Lympia, also beeswax from local beekeepers and essential oils also tries to support local producers as much as possible.'
            }
          </p>
          <p>
            {
              'Her creation took enormous love from people around her and cheer her up to put it in another level. So that’s how she first create a fb account and then an Instagram account and after she felt the need to share knowledge she gain and start searching for a ‘place’ to host her workshop where people could visit. So that magical place after a long time came to her passing, a stone house at the heart of her village Lympia. Lot’s of love put on preparing this workshop and finally in 2022 with all necessary papers and license from pharmaceutical department of Cyprus, workshop was ready to operate legally.'
            }
          </p>
          <p>
            {
              'Her sister Eleni is the arms and legs of natureme, not just the right hand. In our workshop, the roof of creation, you can find us creating olive oil soaps, beeswax creams, laundry detergent, sharing seeds and also architectural projects, cause we forgot to mention that both of us are architects.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
