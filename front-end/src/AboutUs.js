import myImg from './me.png';
import "./AboutUs.css"

const AboutUs = props => {
  return (
    <>
      <p>
        Hi there!
      </p>
      <img 
      class ="author"
      alt="the author" 
      src={myImg}
      width={400}
      />
      <p>
        I was born in Montreal and came to New York when I was 20 after taking a gap year.
        I'm a senior. I stand to graduate in September, almost a year early. 
        I am starting work at Amazon in October as a SDE.
      </p>
      <br />
      <p>
        In my free time, I like writing. 
        Usually poetry or creative writing, but really whatever I am thinking about. 
        I recently started learning the guitar, but I am not very good. I also like to run. 
        I ran the NYC Marathon last November, and I did not train properly.
      </p>
      <br />
      <p>
        I am curious about a lot. 
        I am generally ambitious about doing something impactful with my life. 
        But I am also a strong believer in mindfulness and a Stoic attitude towards every day life. 
        I try not to stress too much about anything or put off being happy. 
        I'm paraphrasing Marcus Aurelius' "Meditations" here: don't wait (until tomorrow) to do the right thing. 
        If you are waiting for the right time (to do something), the time will never come. 
      </p>
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs