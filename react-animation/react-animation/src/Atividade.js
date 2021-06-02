import React, { Component } from "react";
import ReactDOM from "react-dom";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import "./styles3.css";

import axios from 'axios';

// export default function Atividade({props, delayPerPixel = 0.0008, numItems = 52}) {
  export default class Atividade extends Component {

    constructor(props) {

      super(props);
      this.state = {
        atividade: '',
        originOffset: ({top: 0, left: 0}),
        // controls: useAnimation(),
        controls: '',
        isOpen: false,
        delayPerPixel: 0.0008,
        numItems: 5,

        delayRef: (0),
        offset: ({ top: 0, left: 0 }),
        ref: (''),
      };
      this.GridItem = this.GridItem.bind(this);
  }

  componentDidMount() {


    axios.get('http://localhost:8001/atividade-caixa').then(response => {
			

		this.setState({atividade: response.data})
		console.log("response", response.data)
		// setAtividade(response.data)
		console.log("atividade", this.state.atividade)
		// console.log("atividade", this.state.atividade[4].perguntaUrl)
		console.log("atividade", this.state.atividade.id)

		for (let i = 0; i < this.state.atividade.length; i++) {
			console.log("atividade", this.state.atividade[i].id);
		}

	})

    // this.state.controls.start("visible");
  }

  GridItem({ delayPerPixel, i, originIndex, originOffset }) {
  
      const element = true;

      if (!element) return;
  
      // this.state.offset.current = {
      //   top: element.offsetTop,
      //   left: element.offsetLeft
      // };
  
      if (i === originIndex) {
        originOffset.current = this.state.offset.current;
      }

    // useEffect(() => {
      // const dx = Math.abs(this.state.offset.current.left - originOffset.current.left);
      // const dy = Math.abs(this.state.offset.current.top - originOffset.current.top);
      // const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      // this.state.delayRef.current = d * delayPerPixel;
    // }, [delayPerPixel]);

      const Box = styled(motion.div)`
        margin: 10px;
        display: inline-block;
        height: 65px;
        width: 65px;
        background-color: white;
        border-radius: 10px;
      `;


      function converteImagemBase64ParaHtml(imagem) {
        let novaImagem;
        novaImagem = "data:image/jpg;base64," + imagem + "";

        return novaImagem;
      }
    // render() {
      return (

        <div>
          {/* <Box whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.0 }}>
            <img className=""
                  src={`${converteImagemBase64ParaHtml(this.state.atividade.perguntaImg)}`}
                  style={{width: 100, height: 100}}/>
          </Box> */}
			  {this.state.atividade.perguntaTitulo}
        </div>
      //   <Box ref={this.state.ref} custom={this.state.delayRef} 
      //    whileHover={{ scale: 1.1 }}
      //    whileTap={{ scale: 1.0 }}
      //  />
        )
    // }
  }

  //  itemVariants() {
  //   hidden: {
  //     opacity = 0,
  //     scale = 1.5
  //   }
  //   visible: delayRef => ({
  //     opacity: 1,
  //     scale: 1,
  //     transition: { delay: delayRef.current }
  //   })
  // };
  

 render() {
   return (
    <div>
      <motion.div initial="hidden" animate={this.state.controls} variants={{}}>
        {Array.from({ length: this.state.atividade.length }).map((_, i) => (
        <this.GridItem
          key={i}
          i={i}
          originIndex={26}
          delayPerPixel={this.state.delayPerPixel}
          originOffset={this.state.originOffset}

          layout
          data-isOpen={this.state.isOpen}
          initial={{ borderRadius: 50 }}
          className="parent"
          onClick={() => this.setState(!this.state.isOpen)}
        />
        ))}

        <motion.div layout className="child" />
      </motion.div>
    </div>
   )
 };
}
