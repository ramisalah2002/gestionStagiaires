<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avancement extends Model
{
    protected $table = 'avancement';

    use HasFactory;
    protected $fillable = [
        'date',
        'type',
        'text',
        'valeur',
        'projet_id',
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
