import React, { useEffect, useState } from "react";

const HomeMemo = (props) => {
  const [state, setState] = useState({ is: false });
  console.log('Render Home', state);
  useEffect(() => {
    const id = setTimeout(() => {
      setState({ is: true })
      clearTimeout(id);
    }, 3000)
  }, []);



  return (
    <div className='home'>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolore, molestiae accusamus saepe qui minima esse suscipit quis possimus consequatur numquam blanditiis distinctio dolorum doloribus mollitia. Nostrum harum tempore ipsam.
        Assumenda eius perferendis in labore animi maiores sequi impedit sint provident qui! Necessitatibus, possimus placeat autem ipsam magni quas architecto libero cumque nesciunt? Suscipit voluptas nulla omnis, deserunt possimus provident.
        Doloribus quos maiores, in dolore nostrum earum accusantium voluptatem fugit ad sed, explicabo at quod, nulla neque esse odit sunt illo fuga illum. Minus libero mollitia ratione autem ipsa rem!
        Voluptates repudiandae adipisci porro ipsam deserunt natus quod pariatur commodi. Quidem nam, asperiores, ullam vero quisquam voluptatum, temporibus magni quae doloribus aspernatur odio eius debitis nihil illo? Repellat, est accusantium.
    
      </p>

    </div>
  )
};

export const Home = React.memo(HomeMemo);
