<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'duree',
        'objet',
    ];
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }
    public function encadrant()
    {
        return $this->belongsTo(Encadrant::class);
    }
}
