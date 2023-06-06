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
        'type',
        'description',
        'image',
        'equipe_id',
    ];


    public function technologies()
    {
        return $this->belongsToMany(Technologie::class, 'utilisation_technologie', 'projet_id', 'technologie_id');
    }

    public function avancements()
    {
        return $this->hasMany(Avancement::class);
    }
    public function equipe()
    {
        return $this->belongsTo(Equipe::class);
    }
}
