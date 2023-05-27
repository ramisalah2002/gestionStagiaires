import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';

import './Contact.css';

const contact = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_qf5nk4n', 'template_nam9a9e', form.current, 'WrNLXx0JfCLRI5jeK')
          .then((result) => {
              console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };
      
  return (
    <section>
        <div className='container'>
            <h2>Contact us</h2>
            <form ref={form} onSubmit={sendEmail}>
                <input type="text" placeholder='nom complet' name='user_name' required/>
                <input type="email" placeholder='email' name='user_email' required/>
                <input type="text" placeholder='subject' name='subject' required/>
                <textarea name='message' cols='30' rows='10' ></textarea>
                <button type='submit'>Envoyer email</button>
            </form>
        </div>
    </section>
  )
}

export default contact;