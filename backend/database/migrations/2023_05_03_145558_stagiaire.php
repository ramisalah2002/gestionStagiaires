<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stagiaire', function (Blueprint $table) {
            // Inherit columns from the 'utilisateurs' table
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('telephone');
            $table->Date('dateNaissance');
            $table->string('genre');
            $table->string('status');
            $table->string('CIN');
            $table->string('CNE');
            $table->string('formation');
            $table->longText('image')->nullable();
            $table->longText('couverture')->nullable();
            $table->string('etablissement_id')->references('id')->on('etablissement')->onDelete('cascade')->nullable();
            $table->string('equipe_id')->references('id')->on('equipe')->onDelete('cascade')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
