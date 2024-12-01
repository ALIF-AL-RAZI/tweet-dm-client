/* eslint-disable prettier/prettier */
// material-ui

import { CurrencyExchange } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import EarningCard from 'ui-component/cards/EarningCard';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import RevenueCard from 'ui-component/cards/RevenueCard';
import Tutorial from 'ui-component/tutorial';

const Dashboard = () => {
    const { palette } = useTheme();
    const cartData = [
        {
            id: '1',
            primary: '',
            secondary: 'Step 1',
            content: 'Enter Twitter Email Accounts',
            iconPrimary: CurrencyExchange,
            color: palette.primary.main
        },
        {
            id: '2',
            primary: '',
            secondary: 'Step 2',
            content: 'Start the Scraping Followers, Followings and more',
            iconPrimary: CurrencyExchange,
            color: palette.secondary.dark
        }, 
        {
            id: '3',
            primary: '',
            secondary: 'Step 3',
            content: 'Get Your Targeted Email list from Twitter to Outreach',
            iconPrimary: CurrencyExchange,
            color: palette.grey[500]
        }
    ];
    return (
        <MainCard sx={{ minHeight: '100%', position: 'relative' }}>
            <Typography
                variant="h2"
                sx={{
                    width: { md: '85%', lg: '90%' },
                    mx: 'auto',
                    mt: '3.5rem',
                    mb: 3,
                    fontSize: { sm: '2.5rem', xs: '1.5rem' },
                    position: 'relative',
                    overflow: 'hidden',
                    ':after': {
                        position: 'absolute',
                        content: `""`,
                        height: '1px',
                        width: '100%',
                        border: '1px solid #ddd',
                        bottom: 0
                    }
                }}
            >
                Working procedure
            </Typography>
            <Box
                sx={{ display: { md: 'flex' }, justifyContent: 'center', gap: 1, width: { md: '85%', lg: '90%' }, mx: 'auto', mt: '3rem' }}
            >
                {cartData?.map?.((item) => (
                    <RevenueCard
                        cardSx={{ width: '100%', mb: { sm: 2, xs: 2 }, minHeight: '160px' }}
                        primaryIconSx={{
                            '&> svg': { width: 30, height: 30, opacity: '0.5' }
                            // [theme.breakpoints.down('sm')]: {
                            //     top: 13,
                            //     '&> svg': { width: 80, height: 80 }
                            // }
                        }}
                        secondarySx={{ fontSize: 30 }}
                        contentSx={{ fontSize: 18 }}
                        key={item.id}
                        {...{ ...item }}
                    />
                ))}
            </Box>
            <Typography variant="h2" sx={{ width: { md: '85%', lg: '90%' }, mx: 'auto', mt: '3.5rem', mb: 3, fontSize: '2.5rem' }}>
                Tutorial
                <Divider />
            </Typography>
            <Tutorial />
        </MainCard>
    );
};

export default Dashboard;
