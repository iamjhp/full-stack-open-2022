import blogs from "../services/blogs"

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)


export default Blog