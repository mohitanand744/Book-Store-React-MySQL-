import Ratings from "../RatingsReviews/Ratings";

const TestimonialCard = ({ data }) => {
  const { name, profile, rating, review } = data;

  return (
    <div className="w-full h-[13rem] max-w-sm mx-auto overflow-hidden bg-white border shadow-lg rounded-2xl">
      <div className="flex bg-[#F6F2EB] justify-between p-3 items-center">
        <div className="flex items-center gap-2">
          <img
            src={profile}
            alt={name}
            className="object-cover w-12 h-12 mr-4 rounded-full"
          />
          <div>
            <h4 className="font-bold text-gray-800">{name}</h4>
            <div className="flex items-center">
              <span className="mr-1 text-sm font-bold text-orange-500">
                {rating}
              </span>
              <div className="flex text-orange-500">
                <Ratings ratings={rating} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 ">
          <img src="/images/quote.svg" alt="quote" />
        </div>
      </div>
      <div className="p-4 text-sm italic text-gray-500">
        <p>{review}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
