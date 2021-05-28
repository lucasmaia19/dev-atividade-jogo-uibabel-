import axios from 'axios';
import "../styles3.css";

import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
const _ = require('lodash');

const AtividadeCaixaResposta = {

    id: '',
	respostaTxt: '',
	respostaUrl: '',
	respostaImg: '',
	respostaCorreta: '',
}

const AtividadeCaixa = {

	id: '',
	perguntaTitulo: '',
	perguntaTxt: '',
	perguntaUrl: '',
	perguntaImg: '',
    atividadeCaixaRespostaA: AtividadeCaixaResposta
}


export default function Atividade({props, delayPerPixel = 0.0008, numItems = 52}) {

	const originOffset = useRef({ top: 0, left: 0 });
	const controls = useAnimation();
	const [isOpen, setIsOpen] = useState(false);

    const [atividade, setAtividade] = useState([])

    // const [atividadeDummy, setAtividadeDummy] = useState(AtividadeCaixa);
    // const [atividadeDummy, setAtividadeDummy] = useState([]);
    const [atividadeDummy, setAtividadeDummy] = useState([]);

  function getTodasAtividades() {

    console.warn('getTodasAtividades()');

    axios.get('http://localhost:8001/atividade_caixa').then(response => {

        console.log('response', response);
        console.log('response.data', response.data);

        const resposeDummy = {...response.data};
        console.log("resposeDummy", resposeDummy)

        const response2 = _.cloneDeep(response.data);
        console.log("response2", response2)
        console.log("atividadeDummy", atividadeDummy);
        setAtividadeDummy(response2);
        console.log("atividadeDummy", atividadeDummy);



        console.log("atividade", atividade)
        setAtividade(response.data)
        console.log("atividade", atividade)


        setAtividadeDummy([{id: 33, perguntaTitulo: "QUAL A PRIMEIRA LETRA?"}]);
        console.log("atividadeDummy", atividadeDummy)
        // setAtividadeDummy(response.data)
        // console.log("atividadeDummy", atividadeDummy)
    })
    .catch((error) => {})
    }

	useEffect(() => {
        getTodasAtividades()
        console.log("atividadeProps", props)

        setAtividade(props)
            // console.log("Props", props.location.state)
            controls.start("visible");
	}, []);

  function GridItem({ delayPerPixel, i, originIndex, originOffset }) {

    function converteImagemBase64ParaHtml(imagem) {

      let novaImagem;
      novaImagem = "data:image/jpg;base64," + imagem + "";

      return novaImagem;
    }

    const delayRef = useRef(0);
    const offset = useRef({ top: 0, left: 0 });
    const ref = useRef();
	
    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;
  
      offset.current = {
        top: element.offsetTop,
        left: element.offsetLeft
      };
  
      if (i === originIndex) {
        originOffset.current = offset.current;
      }
    }, [delayPerPixel]);
  
    useEffect(() => {
      const dx = Math.abs(offset.current.left - originOffset.current.left);
      const dy = Math.abs(offset.current.top - originOffset.current.top);
      const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      delayRef.current = d * delayPerPixel;
    }, [delayPerPixel]);
  
    // return <Box ref={ref} variants={itemVariants} custom={delayRef} 
    //   whileHover={{ scale: 1.1 }}
    //   whileTap={{ scale: 1.0 }} >
    //   </Box>

    return <img className=""
      src={`${converteImagemBase64ParaHtml(atividade.perguntaImg)}`}
      style={{width: 100, height: 100}}/>
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 1.5
    },
    visible: delayRef => ({
      opacity: 1,
      scale: 1,
      transition: { delay: delayRef.current }
    })
  };
  
  const Box = styled(motion.div)`
    margin: 10px;
    display: inline-block;
    height: 65px;
    width: 65px;
    background-color: white;
    border-radius: 10px;
  `;


 return (
   <div className="container-animation">
		<motion.div className="container-animation" initial="hidden" animate={controls} variants={{}}>
			{/* {Array.from({ length: props.location.state.length }).map((_, i) => ( */}
        {Array.from({ length: numItems }).map((_, i) => (
			<GridItem
				key={i}
				i={i}
				originIndex={26}
				delayPerPixel={delayPerPixel}
				originOffset={originOffset}

				layout
				data-isOpen={isOpen}
				initial={{ borderRadius: 50 }}
				className="parent"
				onClick={() => setIsOpen(!isOpen)}
			/>
			))}

			<motion.div layout className="child" />
		</motion.div>
   </div>
 );
}

