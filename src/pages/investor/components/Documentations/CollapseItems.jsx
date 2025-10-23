import React from 'react';

const CustomList = ({ items }) => {
    const getStatusStyle = (status) => {
        const lowercaseStatus = status.toLowerCase();
        if (['done', 'completed'].includes(lowercaseStatus)) {
          return { color: '#34C759', paddingLeft: '8px' };
        } else if (lowercaseStatus === 'in progress') {
          return { color: '#FF9500', paddingLeft: '8px' };
        } else if (lowercaseStatus === 'not started') {
          return { color: '#FF3B30', paddingLeft: '8px' };
        }
        return {};
      };
    return (
        <ul className="custom-list">
            {items.map((item, index) => (
                <li key={index} className="custom-list-item">
                    <span className="item-title">{item?.title}</span>
                    {item?.dateRange && <span className="item-date-range">{item.dateRange}</span>}
                    {item?.status && (
                        <span
                            className="item-status"
                            style={getStatusStyle(item.status)}
                        >
                            {item.status}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
};

const CollapseItems = (props) => {
    return (
        <div className="p-4">
            <CustomList items={props?.items} />
            <style jsx>{`
                .custom-list {
                    list-style-type: none;
                    padding-left: 0;
                    position: relative;
                    margin-top: 8px;
                }
                .custom-list::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0%;
                    bottom: 6%;
                    width: 2px;
                    background-color: #E5E7EE;
                }
                .custom-list-item {
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 12px;
                    min-height: 20px;
                    display: flex;
                    align-items: center;
                    color: #000000;
                }
                .custom-list-item::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 20px;
                    height: 2px;
                    background-color: #E5E7EE;
                }
                .item-title {
                    margin-right: 8px;
                    margin-left: 8px;
                    font-size: 14px;
                }
                .item-date-range {
                    color: #007AFF;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
};

export default CollapseItems;