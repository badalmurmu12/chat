import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CollapseItems from './CollapseItems';
import { Typography, Box } from '@mui/material';

const NestedTimelineItem = ({ title, items }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <li style={{ marginBottom: '0px' }}>
            <div style={{ display: 'flex', alignItems: 'center', color:"#000000", justifyContent: 'space-between' }}>
                <strong  style={{ color:"#000000",fontSize:"14px", paddingBottom:"10px", fontWeight:"400" }}>{title} 2</strong>
                {items && items.length > 0 && (
                    <IconButton onClick={() => setIsOpen(!isOpen)} size="small">
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                )}
            </div>
            {items && items.length > 0 && (
                <Collapse in={isOpen}>
                    <CollapseItems items={items} />
                </Collapse>
            )}
        </li>
    );
};

const CollapsibleTimeline = (props) => {
 
    return (
        <>
        <Box sx={{display:"flex", justifyContent:"flex-start", padding:"8px 8px 0px 0px"}}>
            <Typography sx={{color:"#000000", fontFamily:"Manrope-Medium", fontSize:"14px"}}>
             {props?.title}
            </Typography>
        </Box>
        <Timeline position="right" sx={{
              '&.MuiTimeline-root': {
                padding: "0px 0px 6px 8px",
              },
            [`& .MuiTimelineItem-root:before`]: {
                flex: 0,
                padding: 0,
            },
            [`& .MuiTimeline-vertical`]: {
                padding: 0,
            }
        }}>
            {props?.data?.map((item, index) => (
                <TimelineItem key={index} >
                    <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: '#008080' }} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent >
                        <NestedTimelineItem title={item?.title} items={item?.items} />
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
        </>
    );
};

export default CollapsibleTimeline;