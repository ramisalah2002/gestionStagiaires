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
        'status',
        'stage_id',
        'stagiaire_id',
    ];

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
    public function stagiaire()
    {
        return $this->belongsToMany(Stagiaire::class, 'realisation');
    }

}
