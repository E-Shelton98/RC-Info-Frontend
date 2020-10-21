import React from 'react'

const Form = (props) => {
    //STATE FOR THE FORM
    const [formData, setFormData] = React.useState(props.vehicle)
    //FUNCTION
    const handleSubmit = (event) => {
        event.preventDefault() //Prevent Form from refreshing
        props.handleSubmit(formData)//Submit to Parents desired function
        props.history.push('/')//Push back to display page
    }
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type='text'
                name='img'
                value={formData.img}
                onChange={handleChange}
            />
            <input type='submit' value={props.label} />
        </form>
    )
}

export default Form