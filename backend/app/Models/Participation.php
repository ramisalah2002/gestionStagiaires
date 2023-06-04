<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    protected $table = 'participation';

    use HasFactory;

    protected $fillable = [
        'stagiaire_id',
        'reunion_id',
    ];

    public function stagiaire()
    {
        return $this->belongsToMany(Stagiaire::class);
    }
    public function reunion()
    {
        return $this->belongsToMany(Reunion::class);
    }

}
