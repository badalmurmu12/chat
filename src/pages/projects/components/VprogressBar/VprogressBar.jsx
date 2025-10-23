import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Typography, CssBaseline } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from '@mui/material/Button';
import './VprogressBar.css';



const VprogressBar = (props) => {
	const [scrollY, setScrollY] = useState(0);
	const [stage, setStage] = useState(0);

	const targetRef = useRef(null);
	const targetRefEnd = useRef(null);
	const [isVisible, setIsVisible] = useState(false);



	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => window.removeEventListener('scroll', handleScroll);
	// }, []);

	useEffect(() => {
		console.log('scrollY', window.scrollY)

	}, []);

	useEffect(() => {
		if (props?.stage === 'Planning') {
			setStage(1);
		} else if (props?.stage === 'Development') {
			setStage(2);
		} else if (props?.stage === 'Construction') {
			setStage(3);
		} else if (props?.stage === 'Operation') {
			setStage(4);
		}

	}, [props?.stage]);


	useEffect(() => {
	}, []);

	return (
		<>
			<div class="project-stage">
				<div class="project-stage-inner">
					<Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px", marginBottom: "16px" }}>
					Investment Stage
					</Typography>

					<ul className="stage-list">
						<li className={`stage ${stage >= 1 ? 'completed' : ''}`}>
							<span className="stage-icon">{stage >= 1 ? '✓' : '1'}</span>
							<span className="stage-name">Project Assessment</span>
						</li>
						<li className={`stage ${stage <= 2 ? 'current' : stage > 2 ? 'completed' : ''}`}>
							<span className="stage-icon">{stage >= 2 ? '✓' : '2'}</span>
							<span className="stage-name">Due Diligence</span>
						</li>
						<li className={`stage ${stage <= 3 ? 'current' : stage > 3 ? 'completed' : ''}`}>
							<span className="stage-icon">{stage > 3 ? '✓' : '3'}</span>
							<span className="stage-name">Financial Close</span>
						</li>
						<li className={`stage ${stage <= 4 ? 'current' : ''} nomargin`}>
							<span className="stage-icon">4</span>
							<span className="stage-name">Performance Monitoring</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
export default VprogressBar;

{/* <Container maxWidth="xl" className={styles.keyFeatureblock}>
<CssBaseline />
<div
	ref={targetRef}
	className="target-div"
	style={{
		height: '20px',
	}}
>

</div>
<div className={styles.scrollProgress}>
	<div className={styles?.scrollText}  >
		<div id="scrollText" >
			<div className={styles.headerText}>
				<span className={styles.keyFeature}>
					Getting Started Has Never Been Simpler.
				</span>
				<p className={styles.keyFeatureDescription}>
					Our generative AI will automatically analyse the documents you provide and reduce the hassle of filling out a lot of details
				</p>
			</div>
		</div>
	</div>

	<div className={styles?.progresscontainer}>
		<motion.div
			className={styles?.progressbar}
			style={{ height: `${scrollY}px` }}
			initial={{ height: 0 }}
			animate={{ height: `${scrollY}px` }}
			transition={{ duration: 0.1 }}
		/>
	</div>



	<div className={styles.keyFeatureIllustration}>
		<div className={styles.keyFeatureCardRow}>
			<div className={styles.keyFeatureCardText} >
				<div className={styles.whyDIgit}>
					O1
				</div>

				<div className={styles.whyText}>
					Create Your Digital Project Showcase
				</div>
				<div className={styles.whysubText}>
					Build a compelling digital profile that highlights your project's merits and your team's capabilities through our interactive Q&A process, designed to pre-qualify your project and ensure it meets investors' criteria.
				</div>

			</div>

		</div>
		<div className={styles.keyFeatureCardRow}>
			<div className={styles.keyFeatureCardText} >
				<div className={styles.whyDIgit}>
					O2
				</div>

				<div className={styles.whyText}>
					Get Matched with the Right Investors
				</div>
				<div className={styles.whysubText}>
					Our intelligent matching system analyses your project's digital showcase and securely distributes the link to sustainability-focused investors who are most likely to be interested in your offering.
				</div>

			</div>
		</div>
		<div className={styles.keyFeatureCardRow}>
			<div className={styles.keyFeatureCardText} >
				<div className={styles.whyDIgit}>
					O3
				</div>

				<div className={styles.whyText}>
					Get Personalised Help on Investor Due Diligence
				</div>
				<div className={styles.whysubText}>
					Our expert team provides tailored support to help you navigate the due diligence process, including assistance with creating a comprehensive data room, addressing investor inquiries, and refining your project's financial model.
				</div>

			</div>

		</div>
		<div className={styles.keyFeatureCardRow}>
			<div className={styles.keyFeatureCardText} >
				<div className={styles.whyDIgit}>
					O4
				</div>

				<div className={styles.whyText}>
					Secure Funding and Bring Your Project to Life
				</div>
				<div className={styles.whysubText}>
					Engage with interested investors through our secure communication channels, negotiate financing terms, and secure the funding needed to execute your sustainability-linked project and make a positive impact.
				</div>

			</div>
		</div>
	</div>

</div>
<div
	ref={targetRefEnd}
	className="target-div"
	style={{
		height: '20px',
		marginTop: '-200px'
	}}
>

</div>
<div
	ref={targetRefEnd}
	className="target-div"
	style={{
		height: '120px',

	}}
>

</div>
</Container> */}
