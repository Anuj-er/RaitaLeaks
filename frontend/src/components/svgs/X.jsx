import raitaLeaksLogo from '../../assets/RaitaLeaksLogo.png';
const Xsvg = (props) => (
	<svg aria-hidden='true' viewBox='0 0 24 24' {...props}>
	  <image 
		href={raitaLeaksLogo} 
		width="24" 
		height="24" 
		preserveAspectRatio="xMidYMid meet"
	  />
	</svg>
  );
  
  export default Xsvg;