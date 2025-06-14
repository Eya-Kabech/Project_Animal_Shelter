import React from 'react'
import io from "socket.io-client"
import { useState, useEffect } from 'react';

const ContactUs = () => {
  return (
    <div>

        <form action="">

            <input type="text" name="msg" autoComplete='off'/>
            <input type="submit" value="Send" />
        </form>
    </div>
  )
}

export default ContactUs