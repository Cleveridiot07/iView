const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal server error',
      error: err.message
    });
  };
  
  module.exports = handleErrors;
  