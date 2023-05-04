<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;
    protected $fillable = [
        'sujet',
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
