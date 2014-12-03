var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a prediction');
});

router.post('/submitForm', function(req, res){
	var clump_thick  = req.body.clump_thick,
	cell_size = req.body.cell_size,
	cell_shape = req.body.cell_shape,
	marg_adh = req.body.marg_adh,
	ep_cell_size = req.body.ep_cell_size,
	bare_nuclei = req.body.bare_nuclei,
	bl_chrom = req.body.bl_chrom,
	norm_nuclei = req.body.norm_nuclei,
	mitoses = req.body.mitoses;

	var diagnosis;
	if (cell_size < 2.5){
		if (bare_nuclei>0 && bare_nuclei<6){
			diagnosis = 'Benign';
		}
		else {
			diagnosis = 'Malignant';
		}

	}
	//if cell size >= 2.5
	else {
		if (cell_shape < 2.5){
			if (bare_nuclei ==1 || bare_nuclei == 3 || bare_nuclei == 5){
				diagnosis = 'Benign'
			}
			else {
				diagnosis = 'Malignant'
			}
		}
		else {
			if (cell_size < 4.5){
				if (bare_nuclei > 0 && bare_nuclei < 3){
					diagnosis = 'Benign';
				}
				else {
					diagnosis = 'Malignant';
				}
			}
			else{
				diagnosis='Malignant';
			}
		}
	}



	res.status(200).send(diagnosis);
});

module.exports = router;
