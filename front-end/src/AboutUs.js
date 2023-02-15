import myImg from './me.png';
import "./AboutUs.css"
import { useEffect, useState } from 'react';
import axios from 'axios'

const AboutUs = props => {

  const [aboutUsContent, setAboutUsContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loaded, setLoaded] = useState(false)

  const fetchContent = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        console.log("got the data!")
        // axios bundles up all response data in response.data property
        const fetchedContent = response.data.textContent;
        const fetchedUrl = response.data.imgUrl;
        setAboutUsContent(fetchedContent);
        setImageUrl(fetchedUrl);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }
  
  useEffect( () => {
    fetchContent();
  },[])

  return (
    <>
      <img 
      className ="author"
      alt="the author" 
      src={imageUrl}
      width={400}
      />
      <div dangerouslySetInnerHTML={{__html: aboutUsContent}} />
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs