import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  title: {
    fontSize: 14
  },
  subheader: {
    fontSize: 12
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2.5px 0'
  },
  card: {
    width: 'fit-content',
    background: '#e7e7e7',
    borderRadius: '10px',
    fontSize: '10px',
    padding: '0 5px',
    marginRight: '5px',
    marginBottom: '5px'
  },
  title2: {
    fontSize: '18px',
    maxHeight: '280px',
    overflow: 'auto',
    paddingRight: '10px',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  },
  devTime: {
    fontSize: '12px'
  },
  projectTypes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});
