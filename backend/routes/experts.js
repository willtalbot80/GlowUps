const express = require('express');
const router = express.Router();

const experts = [
    {
        id: 1,
        name: 'Sofia Martinez',
        specialty: 'Skincare & Facials',
        rating: 4.9,
        image: 'https://i.pravatar.cc/150?img=1',
        bio: 'Sofia is a certified esthetician with over 10 years of experience in advanced skincare treatments. She specializes in anti-aging facials and customized skincare routines.',
        experience: '10+ years',
        certifications: ['Licensed Esthetician', 'Advanced Skincare Specialist', 'Chemical Peel Certification']
    },
    {
        id: 2,
        name: 'Amara Johnson',
        specialty: 'Hair Styling & Color',
        rating: 4.8,
        image: 'https://i.pravatar.cc/150?img=5',
        bio: 'Amara is a master colorist and stylist known for her precision cuts and stunning balayage techniques. She has worked with top salons across the country.',
        experience: '8 years',
        certifications: ['Master Colorist', 'Keratin Treatment Specialist', 'Hair Extension Certified']
    },
    {
        id: 3,
        name: 'Priya Patel',
        specialty: 'Makeup Artistry',
        rating: 4.9,
        image: 'https://i.pravatar.cc/150?img=9',
        bio: 'Priya is a professional makeup artist with expertise in bridal, editorial, and special effects makeup. Her work has been featured in multiple fashion magazines.',
        experience: '7 years',
        certifications: ['Professional Makeup Artist', 'Airbrush Makeup Certification', 'Bridal Beauty Specialist']
    },
    {
        id: 4,
        name: 'Chloe Thompson',
        specialty: 'Nail Art & Design',
        rating: 4.7,
        image: 'https://i.pravatar.cc/150?img=16',
        bio: 'Chloe is a nail technician and artist renowned for her intricate nail designs and long-lasting gel applications. She stays current with the latest trends in nail art.',
        experience: '6 years',
        certifications: ['Licensed Nail Technician', 'Gel & Acrylic Specialist', 'Nail Art Design Certification']
    },
    {
        id: 5,
        name: 'Isabella Rossi',
        specialty: 'Brows & Lashes',
        rating: 4.8,
        image: 'https://i.pravatar.cc/150?img=20',
        bio: 'Isabella is a brow and lash specialist with a talent for enhancing natural features. She offers microblading, tinting, and lash extension services.',
        experience: '5 years',
        certifications: ['Microblading Certified', 'Lash Extension Specialist', 'Brow Design Expert']
    },
    {
        id: 6,
        name: 'Naomi Williams',
        specialty: 'Wellness & Massage',
        rating: 4.9,
        image: 'https://i.pravatar.cc/150?img=25',
        bio: 'Naomi is a holistic wellness expert offering therapeutic massage, aromatherapy, and body treatment services. She is dedicated to helping clients achieve total relaxation.',
        experience: '12 years',
        certifications: ['Licensed Massage Therapist', 'Aromatherapy Practitioner', 'Holistic Wellness Coach']
    }
];

// GET endpoint - return all experts
router.get('/', (req, res) => {
    res.json(experts);
});

// GET endpoint - return single expert by id
router.get('/:id', (req, res) => {
    const expert = experts.find(e => e.id === parseInt(req.params.id));
    if (!expert) {
        return res.status(404).json({ message: 'Expert not found' });
    }
    res.json(expert);
});

// POST endpoint
router.post('/', (req, res) => {
    res.send('POST request to the experts endpoint');
});

module.exports = router;