<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $table = 'projet';

    use HasFactory;
    protected $fillable = [
        'sujet',
        'stage_id',
        'presentation_id',
        'rapport_id',
    ];

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
    public function stagiaire()
    {
        return $this->hasMany(Stagiaire::class);
    }
    public function rapport()
    {
        return $this->belongsTo(Rapport::class);
    }
    public function presentation()
    {
        return $this->belongsTo(Presentation::class);
    }
}