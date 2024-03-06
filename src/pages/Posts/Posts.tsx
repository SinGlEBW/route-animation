import { Preloader } from '@/components/common/Preloader/Preloader';
import React from "react";


const PostsMemo = (props) => {


  return (
    <div className='posts'>
      <h1>Посты</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam assumenda harum ipsam iste eum dolorum architecto odio eos incidunt, repellendus temporibus, autem nam corrupti optio fuga nemo sint alias?
        Ducimus eum facere quidem sit. Sint, aspernatur. Esse sint, consectetur non incidunt modi quod impedit necessitatibus inventore omnis voluptatum nam id quaerat, deserunt unde eius rem aspernatur ipsam soluta suscipit.
        Sit, corporis culpa. Minima optio, officiis voluptas fugit delectus laborum ex reiciendis? Consectetur, culpa! In, velit inventore quos repellat pariatur sapiente atque eaque quam, magnam harum tempore. Non, porro saepe.
        Iste nesciunt cupiditate illo unde, ex nemo asperiores fuga harum, veniam totam laudantium quos magnam earum modi quidem dolore amet tempora. Eius enim aut ex, quis illum itaque odit neque?
      
      </p>
    </div>

  )
};

export const Posts = React.memo(PostsMemo);

