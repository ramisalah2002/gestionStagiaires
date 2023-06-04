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
        Schema::create('projet', function (Blueprint $table) {
            $table->id();
            $table->string('sujet');
            $table->string('status');
            $table->string('type');
            $table->text('description');
            $table->float('avancement_conception');
            $table->float('avancement_frontend');
            $table->float('avancement_backend');
            $table->float('avancement_total');
            $table->foreignId('stage_id')->references('id')->on('stage')->onDelete('cascade');
            $table->foreignId('equipe_id')->references('id')->on('equipe')->onDelete('cascade');
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
