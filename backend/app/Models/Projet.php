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
        'avancement_conception',
        'avancement_frontend',
        'avancement_backend',
        'avancement_total',
        'stage_id',
        'equipe_id',
    ];

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
    public function technologie()
    {
        return $this->belongsToMany(Technologie::class, 'utilisation_technologie');
    }
    public function avancement()
    {
        return $this->hasMany(Avancement::class);
    }
    public function equipe()
    {
        return $this->belongsTo(Equipe::class);
    }
}
