<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    protected $table = 'stage';

    use HasFactory;
    protected $fillable = [
        'date_debut',
        'duree',
        'stagiaire_id',
        'administrateur_id',
        'encadrant_id',
    ];
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }
    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class);
    }
    public function presentation()
    {
        return $this->hasMany(Presentation::class);
    }
    public function rapportStage()
    {
        return $this->belongsTo(RapportStage::class);
    }
}
