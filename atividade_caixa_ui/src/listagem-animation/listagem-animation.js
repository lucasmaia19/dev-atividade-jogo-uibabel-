import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import "../styles3.css";
import axios from 'axios';

export default function ListagemAnimation({props, delayPerPixel = 0.0008, numItems = 5}) {

	useEffect(() => {
		controls.start("visible");
		axios.get('http://localhost:8001/atividade_caixa').then(response => {
			setAtividade(response.data)
			console.log("response", response.data)
		})
		// console.log("props", props.location.state)
	}, []);

	const [atividade, setAtividade] = useState([])

	function converteImagemBase64ParaHtml(imagem) {

		let novaImagem;
		novaImagem = "data:image/jpg;base64," + imagem + "";

		return novaImagem;
	}

	const originOffset = useRef({ top: 0, left: 0 });
	const controls = useAnimation();
	const [isOpen, setIsOpen] = useState(false);

	function GridItem({ delayPerPixel, i, originIndex, originOffset }) {
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

			return <Box ref={ref} variants={itemVariants} custom={delayRef} 
		      whileHover={{ scale: 1.1 }}
			  whileTap={{ scale: 1.0 }}>
				{/* <img className=""
					src={`${converteImagemBase64ParaHtml(props.location.state.perguntaImg)}`}
					style={{width: 100, height: 100}}/> */}
			</Box>;
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
	<div>
		<motion.div initial="hidden" animate={controls} variants={{}}>
			{Array.from({ length: 2 }).map((_, i) => (
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
